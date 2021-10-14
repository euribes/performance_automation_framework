import http from 'k6/http'
import { check, group, sleep } from 'k6'
import { Rate } from 'k6/metrics'
import { urls } from './urls.js'

// A custom metric to track failure rates
var failureRate = new Rate('check_failure_rate')

// Options
export let options = {
  stages: [
    // Linearly ramp up from 1 to 50 virtual users during first 30 seconds
    { target: 50, duration: '30s' },
    // Hold at 50 virtual users for the next 30 seconds
    { target: 50, duration: '30s' },
    // Linearly ramp down from 50 to 0 50 virtual users over the last 30 seconds
    { target: 0, duration: '30s' }
    // Total execution time will be ~1.5 minutes
  ],
  thresholds: {
    // We want the 95th percentile of all HTTP request durations to be less than 500ms
    http_req_duration: ['p(95)<500'],
    // Requests with the staticAsset tag should finish even faster
    'http_req_duration{staticAsset:yes}': ['p(99)<250'],
    // Thresholds based on the custom metric we defined and use to track application failures
    check_failure_rate: [
      // Global failure rate should be less than 1%
      'rate<0.01',
      // Abort the test early if it climbs over 5%
      { threshold: 'rate<=0.05', abortOnFail: true }
    ]
  }
}

// Main function
export default function () {
  let response = http.get(urls.baseUrl)

  // check() returns false if any of the specified conditions fail
  let checkRes = check(response, {
    'http2 is used': (r) => r.proto === 'HTTP/2.0',
    'status is 200': (r) => r.status === 200,
    'content is present': (r) =>
      r.body.indexOf('This is a real-world app built with wordpress to be used as a playground environment') !== -1
  })

  // We reverse the check() result since we want to count the failures
  failureRate.add(!checkRes)

  // Load static assets, all requests
  group('Static Assets', function () {
    // Execute multiple requests in parallel like a browser, to fetch some static resources
    let resps = http.batch([
      [
        'GET',
        `${urls.baseUrl}/wp-content/themes/storefront/style.css?ver=2.5.7`,
        null,
        { tags: { staticAsset: 'yes' } }
      ],
      ['GET', `${urls.baseUrl}/wp-content/uploads/2019/05/hero.jpg`, null, { tags: { staticAsset: 'yes' } }],
      [
        'GET',
        `${urls.baseUrl}/wp-content/themes/storefront/assets/js/woocommerce/header-cart.min.js?ver=2.5.7`,
        null,
        { tags: { staticAsset: 'yes' } }
      ]
    ])
    // Combine check() call with failure tracking
    failureRate.add(
      !check(resps, {
        'status is 200': (r) => r[0].status === 200 && r[1].status === 200,
        'reused connection': (r) => r[0].timings.connecting == 0
      })
    )
  })

  sleep(Math.random() * 3 + 2) // Random sleep between 2s and 5s
}
