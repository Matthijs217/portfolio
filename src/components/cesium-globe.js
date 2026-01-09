import "cesium/Build/Cesium/Widgets/widgets.css";
import "./cesium-globe.css";
import * as Cesium from "cesium";

// Stel Cesium base URL in voor productie builds
if (typeof CESIUM_BASE_URL !== "undefined") {
  window.CESIUM_BASE_URL = CESIUM_BASE_URL;
}

export function mountCesium(containerOrId, points = []) {
  const container =
    typeof containerOrId === "string"
      ? document.getElementById(containerOrId)
      : containerOrId;

  if (!container) throw new Error("Cesium container niet gevonden.");

  Cesium.Ion.defaultAccessToken = import.meta.env.PUBLIC_CESIUM_ION_TOKEN;

  const viewer = new Cesium.Viewer(container, {
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    baseLayerPicker: false,
    infoBox: false,
    selectionIndicator: false,
    shouldAnimate: false,
  });

  // ✅ camera limits: nooit “in de aarde”
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1500000;
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = 60000000;

  viewer.scene.skyAtmosphere.show = true;
  viewer.scene.globe.enableLighting = true;
  viewer.scene.mode = Cesium.SceneMode.SCENE3D;

  // --- Modal popup voor click ---
  const modal = document.createElement("div");
  modal.className = "cesium-modal";
  document.body.appendChild(modal);

  const modalContent = document.createElement("div");
  modalContent.className = "cesium-modal-content";
  modal.appendChild(modalContent);

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const showModal = (p) => {
    const images = p.images || (p.img ? [p.img] : []);
    const imageGalleryHTML = images.length > 0
      ? `<div class="cesium-modal-gallery">
          ${images.map(img => `<img src="${img}" alt="${escapeHtml(p.name ?? '')}" />`).join("")}
        </div>`
      : "";

    modalContent.innerHTML = `
      <button class="cesium-modal-close" onclick="this.closest('.cesium-modal').classList.remove('active');document.body.style.overflow='';">
        ×
      </button>
      <div>
        <h2>${escapeHtml(p.name ?? "")}</h2>
        ${p.desc ? `<p>${escapeHtml(p.desc)}</p>` : ""}
        ${imageGalleryHTML}
      </div>
    `;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // --- Entities (markers) ---
  for (const p of points) {
    const entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        Number(p.lon),
        Number(p.lat),
        Number(p.height ?? 0)
      ),
      point: { pixelSize: 10, outlineWidth: 2 },
      label: p.label
        ? {
            text: p.label,
            font: "14px sans-serif",
            pixelOffset: new Cesium.Cartesian2(0, -28),
            showBackground: true,
          }
        : undefined,
    });

    entity.properties = new Cesium.PropertyBag({
      name: p.name ?? "",
      desc: p.desc ?? "",
      img: p.img ?? "",
      images: p.images ?? [],
      lon: Number(p.lon),
      lat: Number(p.lat),
    });
  }

  // Start camera (meer “bol” gevoel)
  if (points[0]) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(points[0].lon, points[0].lat, 19000000),
      duration: 0.9,
    });
  } else {
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(0, 20, 25000000),
    });
  }

  // --- Click op marker = modal popup ---
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  handler.setInputAction((movement) => {
    const picked = viewer.scene.pick(movement.endPosition);
    if (Cesium.defined(picked) && picked.id && picked.id.properties) {
      viewer.scene.canvas.style.cursor = "pointer";
    } else {
      viewer.scene.canvas.style.cursor = "default";
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction((click) => {
    const picked = viewer.scene.pick(click.position);
    if (!Cesium.defined(picked) || !picked.id || !picked.id.properties) return;

    const ent = picked.id;
    const name = ent.properties.name?.getValue?.() ?? "";
    const desc = ent.properties.desc?.getValue?.() ?? "";
    const img = ent.properties.img?.getValue?.() ?? "";
    const images = ent.properties.images?.getValue?.() ?? [];
    
    showModal({ name, desc, img, images });
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  viewer.__cleanup = () => {
    try { handler.destroy(); } catch {}
    try { modal.remove(); } catch {}
  };

  return viewer;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
