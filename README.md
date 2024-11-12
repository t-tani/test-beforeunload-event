# Test beforeunload event

This is a test page to examine the behavior of the "beforeunload" event and related browser interactions.

## Purpose

The purpose of this test page is to:

1. Demonstrate how the "beforeunload" event behaves in various browsers.
2. Observe redirect behaviors and timing.

## Page Components

1. **Simple Redirect button**: Redirects to the same page while setting a timestamp in localStorage.
2. **Refresh button**: Clears localStorage and cookies, then reloads the page.

## How to Use

1. Open the test page in different browsers you want to compare.
2. Observe the initial cookies and localStorage values displayed.
3. Click the "Simple redirect button" to test redirection behavior.
4. Use the "Refresh" button to reset the page state.
5. Attempt to close the tab or navigate away from the page to trigger the "beforeunload" event.

## Key Features

- Sets a KC_RESTART cookie on page load.
- Implements a timer check for cookies using the `checkCookiesAndSetTimer` function.
- Displays and manipulates both cookies and localStorage.

## Notes

- The exact behavior may vary between browser versions.
- This test focuses on KC_RESTART cookie and its interaction with page navigation.
- The commented-out buttons for KEYCLOAK_SESSION manipulation can be uncommented for additional testing scenarios.
