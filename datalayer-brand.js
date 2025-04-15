window.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname.toLowerCase();
    console.log("✅ Skript se načetl. Aktuální URL path:", path);
  
    var brandPages = [
      "/servis-a-opravy-apple-iphone",
      "/opravy-a-servis-samsung",
      "/oprava-a-servis-xiaomi",
      "/oprava-a-servis-honor",
      "/opravy-a-servis-google-pixel",
      "/vivo",
      "/pocophone",
      "/opravy-a-servis-sony",
      "/motorola-2",
      "/opravy-a-servis-realme",
      "/opravy-a-servis-huawei",
      "/opravy-a-servis-oneplus",
      "/oprava-a-servis-nokia",
      "/opravy-a-servis-lg",
      "/opravy-a-servis-lenovo",
      "/infinix"
    ];
  
    var match = brandPages.some(function (slug) {
      return path.includes(slug);
    });
  
    console.log("🔍 Test shody s URL slugy:", match);
  
    if (match) {
      console.log("✅ Odesílám dataLayer event: view_item_list_brand");
      dataLayer.push({
        event: "view_item_list_brand"
      });
    }
  });
  