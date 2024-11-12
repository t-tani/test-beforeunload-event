const CHECK_INTERVAL_MILLISECS = 2000;
const AUTH_SESSION_TIMEOUT_MILLISECS = 1000;
const initialSession = getSession();

let timeout;
// Remove the timeout and  when unloading to avoid execution of the
// checkCookiesAndSetTimer when the page is already submitted
addEventListener("beforeunload", () => {
  localStorage.setItem("setTime_BeforeUnload", parseInt(Date.now()));
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
});

export function checkCookiesAndSetTimer(loginRestartUrl) {
  if (initialSession) {
    // We started with a session, so there is nothing to do, exit.
    return;
  }

  const session = getSession();

  if (!session) {
    // The session is not present, check again later.
    timeout = setTimeout(
      () => checkCookiesAndSetTimer(loginRestartUrl),
      CHECK_INTERVAL_MILLISECS,
    );
  } else {
    localStorage.setItem("setTime_CheckCookiesAndSetTimer", parseInt(Date.now()));
    // Redirect to the login restart URL. This can typically automatically login user due the SSO
    if (!getCookieByName("KC_RESTART")){
      localStorage.setItem('setTime_RedirectEventWithoutKC_RESTART', startTime);
    } 
    location.href = loginRestartUrl;
  }
}

function getSession() {
  return getCookieByName("KEYCLOAK_SESSION");
}

function getCookieByName(name) {
  for (const cookie of document.cookie.split(";")) {
    const [key, value] = cookie.split("=").map((value) => value.trim());
    if (key === name) {
      return value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
    }
  }
  return null;
}

export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }

  return cookies.length; // 削除されたCookieの数を返す
}