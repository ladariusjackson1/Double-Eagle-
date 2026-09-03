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
  formEndpoint: "https://formspree.io/f/xljrovea",

  /* Scheduling link (Calendly / SavvyCal / Cal.com / TidyCal).
     Set this and the "Book a call" buttons will point straight at it.
     Leave empty to keep visitors on the on-site qualification form. */
  bookingUrl: "https://calendly.com/double-eagle-financial/profit-leak-audit-call",

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
