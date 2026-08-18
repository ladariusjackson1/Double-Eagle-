/* Double Eagle Financial — site configuration
   ----------------------------------------------------------------------
   EDIT THIS FILE BEFORE LAUNCH. Nothing here is secret; it contains only
   public endpoint URLs. Never put API keys or credentials in this file.
   ---------------------------------------------------------------------- */
window.DE_CONFIG = {

  /* Where form submissions are POSTed as JSON.
     Works with Formspree, Basin, Netlify Forms (function), Make.com or
     Zapier catch hooks, or your own endpoint.
     Example: "https://hook.us1.make.com/xxxxxxxxxxxxx"
     Leave empty and forms will show a clear configuration error instead of
     silently discarding leads. */
  formEndpoint: "",

  /* Scheduling link (Calendly / SavvyCal / Cal.com / TidyCal).
     Set this and the "Book a call" buttons will point straight at it.
     Leave empty to keep visitors on the on-site qualification form. */
  bookingUrl: "",

  /* Cal.com event link — turns the header "Book a call" button into a popup
     and powers the inline calendar on /book-a-call.html.
     Find yours at https://app.cal.com/event-types, click the event, and
     copy the link shown there. Use just the "username/event-slug" part,
     e.g. "jane-doe/20min" (no https://cal.com/ prefix).
     Leave empty and both stay on the existing qualification-form flow. */
  calLink: "double-eagle-gngiof/free-profit-leak-audit-call",

  /* Business contact details — used in structured data and mailto links. */
  email: "hello@doubleeaglefinancial.com",
  phone: "",

  /* Optional analytics. Leave empty to run without any tracking scripts. */
  ga4MeasurementId: "",
  gtmContainerId: ""
};

/* If a booking URL is configured, upgrade on-page booking buttons to use it. */
(function () {
  var url = window.DE_CONFIG.bookingUrl;
  if (!url) return;
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-booking-link]").forEach(function (a) {
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  });
})();

/* Cal.com embed — loads the official embed script once, wires the header
   "Book a call" button as a popup trigger, and (on pages that have the
   #cal-inline-embed container) renders the inline calendar.
   Does nothing until DE_CONFIG.calLink is set above. */
(function () {
  var calLink = window.DE_CONFIG.calLink;
  if (!calLink) return;

  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", "de-booking", { origin: "https://cal.com" });

  Cal.ns["de-booking"]("ui", {
    theme: "light",
    styles: { branding: { brandColor: "#A87F26" } },
    hideEventTypeDetails: false,
    layout: "month_view"
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-cal-trigger]").forEach(function (el) {
      el.setAttribute("data-cal-link", calLink);
      el.setAttribute("data-cal-namespace", "de-booking");
      el.setAttribute("data-cal-config", '{"layout":"month_view"}');
    });

    if (document.getElementById("cal-inline-embed")) {
      Cal.ns["de-booking"]("inline", {
        elementOrSelector: "#cal-inline-embed",
        calLink: calLink,
        config: { layout: "month_view" }
      });
    }
  });
})();
