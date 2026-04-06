// ── Mobile nav ───────────────────────────────────────────────────────────────
const menuToggle = document.querySelector(".menu-toggle");
const siteNav    = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ── Active nav link ───────────────────────────────────────────────────────────
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("is-active");
});

// ── Year ──────────────────────────────────────────────────────────────────────
document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

// ── Project filter ────────────────────────────────────────────────────────────
const filterButtons = document.querySelectorAll(".filter-chip");
const projectCards  = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((chip) => chip.classList.remove("is-active"));
      button.classList.add("is-active");
      projectCards.forEach((card) => {
        const matches =
          selected === "all" || card.dataset.category.split(" ").includes(selected);
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const groups = [
    { selector: ".section-heading",        stagger: 0    },
    { selector: ".pillars-inline article", stagger: 0.12 },
    { selector: ".service-grid-card",      stagger: 0.07 },
    { selector: ".audience-card",          stagger: 0.14 },
  ];

  const allEls = [];

  groups.forEach(({ selector, stagger }) => {
    document.querySelectorAll(selector).forEach((el) => {
      const childSelector = selector.split(" ").pop();
      const siblings = Array.from(
        el.parentElement.querySelectorAll(":scope > " + childSelector)
      );
      const idx   = siblings.indexOf(el);
      const delay = Math.min(idx * stagger, 0.35);

      el.classList.add("reveal");
      el.style.transitionDelay = delay + "s";

      const img = el.querySelector(".service-grid-image");
      if (img) img.style.transitionDelay = delay + "s";

      const pv = el.querySelector(".pillar-visual");
      if (pv) pv.style.transitionDelay = delay + "s";

      allEls.push(el);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
  );

  allEls.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initReveal);

// ── Service area modal ────────────────────────────────────────────────────────
const SERVICE_DATA = {
  "traffic-data": {
    label: "Service Area",
    title: "Traffic Data Analysis",
    image: "assets/projects/th12-staging-case.png",
    featured: [
      {
        sp: "MnDOT Metro District",
        name: "TH 77 StreetLight Ramp Study",
        challenge: "All ramps along the Hwy 77 corridor needed to be evaluated for potential concurrent closure. Analysts needed to identify which entrance/exit ramp pairs carried the most interdependent traffic to avoid unacceptable network impacts.",
        tools: "StreetLight OD (origin-destination matrix), MnDOT loop detectors for ramp volumes, OSM line segment gates for NB and SB analyses.",
        outcome: "OD matrix ranked all ramp-pair dependencies, providing data-driven recommendations on which ramps could close concurrently and which required staggered timing to maintain acceptable operations."
      },
      {
        sp: "SP 2713-129",
        name: "TH 12 Staging Alternatives",
        challenge: "Travel delay locations and diversion patterns along TH 12 needed to be quantified to evaluate competing staging alternatives for construction, including movable barrier staging.",
        tools: "ClearGuide (Routes 4108 & 4109, loop detectors 1630–1833), StreetLight OD for top origin-destination routes and diversion percentages.",
        outcome: "Identified AM/PM peak delay hotspots, confirmed top diversion routes (Co Rd 6, Shoreline Dr, Wayzata Blvd), and quantified split percentages — directly informing the preferred staging alternative."
      }
    ],
    projects: [
      "TH 77 MnDOT StreetLight Ramp Study",
      "SP 2713-129 — TH 12 Staging Alternatives",
      "SP 1909-99 — TH 55 Construction Impact (StreetLight OD)",
      "SP 2736-46 — TH 101 Analysis (StreetLight Insight trip attributes)",
      "SP 5880-1998 — I-35 Hinckley Seasonal Volume Analysis",
      "SP 6215-114 — Snelling Ave Origin-Destination Study",
      "SP 2781-544 — I-94 Dartmouth Bridge Diversion Analysis",
      "SP 6242-83 — TH 280 State Fair Travel Pattern Study"
    ]
  },
  "freeway-ops": {
    label: "Service Area",
    title: "Freeway Operations & Safety",
    image: "assets/projects/th5-category.png",
    featured: [
      {
        sp: "SP 6242-83",
        name: "TH 280 Construction Traffic Impact Analysis",
        challenge: "TH 280 required a long-term full closure between I-35W and I-94, including bridge work on Franklin Ave, University Ave, and Territorial Rd. The project also needed to account for State Fair traffic patterns on the partially open corridor.",
        tools: "Regional traffic model, StreetLight OD for diversion routing, ramp volume analysis, signal timing assessment at Vandalia St interchanges.",
        outcome: "Identified key diversion corridors (TH51, I-35W, I-35E, Cleveland Ave), recommended signal adjustments at Vandalia St ramps, and developed a separate strategy for the State Fair period with partial corridor access."
      },
      {
        sp: "SP 2781-544",
        name: "I-94 Dartmouth Bridge — Multi-Stage Closure Analysis",
        challenge: "The Dartmouth Bridge on I-94 carries 81,300 vehicles/day and required three construction stages including full WB and EB closures with multiple ramp shutdowns. Diversion impacts needed to be quantified for each stage.",
        tools: "StreetLight OD for diversion routing, volume analysis across 15+ alternate routes, staged ramp closure sequencing.",
        outcome: "Developed a three-stage construction plan with volume estimates for each diversion route, ramp closure sequences, and identification of segments (SB I-35W, WB I-394, NB I-94) absorbing the highest diverted traffic."
      }
    ],
    projects: [
      "SP 6242-83 — TH 280 Full Corridor Closure Analysis",
      "SP 2781-544 — I-94 Dartmouth Bridge Multi-Stage Analysis",
      "SP 2772-125 — TH 169 at 36th Ave Queue Analysis",
      "SP 2772-115 — US 169 at Rockford Bridge Ramp Closure",
      "SP 7005-143 — Freeway Queue Delay EB/WB Analysis",
      "SP 5880-1998 — I-35 Hinckley NB Lane Closure",
      "SP 8825-1012 — TH 61 IDIQ Queue Delay & Sensitivity",
      "SP 1906-71 — US 52 Construction Impact (Regional Model)",
      "I-35 NB Lane Closure at Rush City"
    ]
  },
  "performance": {
    label: "Service Area",
    title: "Performance Monitoring",
    image: "assets/projects/th77-streetlight-case.png",
    featured: [
      {
        sp: "SP 6212-192",
        name: "WB TH 36 Detour Impact Analysis",
        challenge: "A 14-day full closure of WB TH 36 required pre-construction performance monitoring to establish a reliable baseline and assess whether post-COVID volumes had recovered sufficiently to stress the detour network.",
        tools: "ClearGuide (pre-construction speed data, October 2022), MnDOT freeway loop detectors (AM peak volume), travel time reliability analysis.",
        outcome: "Confirmed AM peak volume of ~3,000 veh/hr requiring two lanes of operation, validated volume recovery to near pre-COVID levels, and established speed baselines for post-construction comparison."
      },
      {
        sp: "SP 5880-1998",
        name: "I-35 Hinckley — Seasonal Construction Impact",
        challenge: "An NB I-35 lane closure at Hinckley in summer months required understanding seasonal volume variation versus a prior 2018 closure, so predicted impacts could be calibrated against observed outcomes.",
        tools: "StreetLight Data (March–October 2019 seasonal comparison), MnDOT loop detectors, actual vs. predicted comparison framework.",
        outcome: "Seasonal analysis showed summer volumes 5–18% higher than spring/fall; model predictions were validated against 2018 actual conditions, providing a calibrated basis for the 2022 construction impact forecast."
      }
    ],
    projects: [
      "SP 6212-192 — TH 36 Pre/Post Construction Speed Monitoring",
      "SP 5880-1998 — I-35 Hinckley Seasonal Volume Comparison",
      "SP 8825-1012 — TH 61 Loop Detector Queue Monitoring",
      "SP 7005-143 — Actual vs. Predicted Queue Delay Comparison",
      "SP 2713-129 — TH 12 ClearGuide Travel Time Monitoring",
      "I-35 NB Rush City — Actual vs. Predicted Performance Validation"
    ]
  },
  "transit-study": {
    label: "Service Area",
    title: "Traffic & Transit Study",
    image: "assets/projects/snelling-category.png",
    featured: [
      {
        sp: "SP 6215-114",
        name: "Snelling Ave Corridor Study — St. Claire to Grand Ave",
        challenge: "Construction on Snelling Ave required understanding where NB and SB traffic originated and where it was headed, to assess parallel route capacity and recommend intersection improvements at key diversion points.",
        tools: "StreetLight OD (origin-destination analysis zones), MnDOT AADT data (2017, 2019), intersection capacity analysis at Hamline Ave and Fairview Ave.",
        outcome: "Found 26% of NB traffic diverts to WB I-94; identified Fairview Ave as a constrained parallel route during peak hours; recommended protected left-turn phasing at Hamline Ave/Grand Ave to accommodate diversion volumes."
      },
      {
        sp: "MAG 2012 VOS",
        name: "MAG 2012 Vehicle Occupancy Study — Phoenix Region HOV & Travel Demand",
        challenge: "HOV lane coverage in the Phoenix region had grown from ~180 to 350+ directional miles since the last study in 2008, requiring updated vehicle occupancy and classification data to recalibrate the regional travel demand model, truck travel model, and support HOV lane efficiency evaluation.",
        tools: "Windshield method (roadside observers during peak periods 6–9 AM and 3–7 PM), Carousel method (in-vehicle GPS touch-pad at off-peak speeds), ADOT Freeway Management System counts, radar-based supplemental counts; 13-category vehicle classification scheme across HOV and general purpose lanes.",
        outcome: "Delivered updated occupancy profiles by facility type and time of day for regional model calibration; quantified HOV violation rates and person/vehicle throughput efficiency during congested peak hours; provided vehicle classification distributions used in truck model validation, air quality modeling, and pavement design."
      }
    ],
    projects: [
      "SP 6215-114 — Snelling Ave Corridor OD Study",
      "SP 2736-46 — TH 101 Traveler Attribute Analysis",
      "SP 1921-107 — TH 3 Rosemount Detour & Volume Study",
      "SP 2724-130 — TH 55 at Lake St Traffic Study",
      "SP 1909-99 — TH 55 at MSP Airport Travel Pattern Study",
      "Robert St Study — 2046 No-Build Traffic Forecast"
    ]
  },
  "impact-mitigation": {
    label: "Service Area",
    title: "Traffic Impact Analysis & Mitigation",
    image: "assets/projects/th101-category.png",
    featured: [
      {
        sp: "SP 2772-125",
        name: "TH 169 at 36th Ave — Construction Queue Impact",
        challenge: "A weekend TH 169 closure would redirect up to 1,800 PCE/lane onto I-394 WB. The team needed to quantify queue delay at diversion rates ranging from 40% to 80% to determine whether the corridor could absorb the added volume and what mitigation was needed.",
        tools: "Queue delay model, capacity analysis, diversion sensitivity analysis across four scenarios (40%, 60%, 80%, 100% diversion).",
        outcome: "Sensitivity analysis showed I-394 approaches capacity constraints at 60%+ diversion; findings guided closure timing decisions, coordination with I-394 maintenance, and public communications on expected delays."
      },
      {
        sp: "SP 6242-83",
        name: "TH 280 Full Closure — Mitigation Strategy",
        challenge: "Full closure of TH 280 between I-35W and I-94 would redistribute significant volumes to neighborhood streets and freeway ramps, requiring both a traffic analysis and a practical mitigation plan including signal timing recommendations.",
        tools: "Regional model, StreetLight OD diversion analysis, turning movement analysis at key intersections, ramp volume assessment.",
        outcome: "Recommended signal adjustments at Vandalia St ramps to handle increased volume, identified streets requiring monitoring (Eustis St corridor), and developed bridge-specific closure sequencing to minimize neighborhood impact."
      }
    ],
    projects: [
      "SP 2772-125 — TH 169 at 36th Ave Queue & Diversion Analysis",
      "SP 6242-83 — TH 280 Full Closure Impact & Mitigation",
      "SP 0208-165 — TH 65 Construction Traffic Impact Analysis",
      "SP 1921-107 — TH 3 Rosemount Detour Impact Study",
      "SP 1909-99 — TH 55 Construction Detour Analysis",
      "SP 6212-192 — TH 36 Full Closure Detour Planning",
      "SP 2781-544 — I-94 Dartmouth Bridge Staged Closure",
      "SP 2772-115 — US 169 Rockford Ramp Closure Impact",
      "SP 1906-71 — US 52 North & South Section Impact Analysis",
      "SP 2713-123 — TH 12 Detour Analysis",
      "SP 7005-143 — Freeway Queue Delay & Mitigation",
      "I-35 NB Rush City — Lane Closure Impact Study",
      "SP 5880-1998 — I-35 Hinckley Construction Impact"
    ]
  },
  "modeling": {
    label: "Service Area",
    title: "Traffic Modeling & Calibration",
    image: "assets/projects/synchro.jpg",
    featured: [
      {
        sp: "Tool Development",
        name: "Work Zone Queue-Delay Model — Excel-Based Estimation Tool",
        challenge: "Existing software tools for estimating lane closure impacts require significant time to calibrate and validate, and demand specialized expertise — making them impractical for maintenance operations staff and routine project needs.",
        tools: "Excel macro with linear regression models calibrated for multiple lane closure configurations (2-to-1, 3-to-2, 3-to-1) across various freeway configurations and volume levels; no additional software subscription required.",
        outcome: "Delivered a validated, easy-to-use queue length and delay estimation tool adoptable by maintenance and operations staff. Linear regression models provide higher-level but rapid estimates of effective delay and queue — significantly reducing analysis time while eliminating software licensing barriers."
      },
      {
        sp: "Model Development",
        name: "Dynamic Traffic Assignment — OD Matrix Estimation (ODME)",
        challenge: "Accurate dynamic traffic assignment requires an OD matrix that reflects real-world conditions. Standard seed matrices often produce volume estimates that diverge significantly from observed link counts, particularly for multi-class freeway systems.",
        tools: "DynusT (Dynamic User Optimal equilibrium), bi-level ODME optimization algorithm; three vehicle classes — SOV, HOV, and heavy vehicles (trucks); observed link volume targets for calibration.",
        outcome: "Implemented a bi-level optimization process: the upper level adjusts individual OD pair demands to minimize the difference between simulated and observed volumes; the lower level re-establishes DUO equilibrium in DynusT. Iterative feedback between levels produces a calibrated OD matrix that replicates observed traffic patterns across all three vehicle classes."
      },
      {
        sp: "Phase I & II (2018–2020)",
        name: "Activity-Based Model — Work Zone Application (CUBE Catalog)",
        challenge: "MnDOT Metro District needed standardized tools to streamline activity-based traffic forecasting for work zone analysis. The effort required coordinating technical development across multiple modeling platforms while ensuring outputs were practical and deployable for real project needs.",
        tools: "CUBE Catalog; Met Council ABM; 4- and 11-time-period traffic assignment; loaded network comparison; selected link analysis.",
        outcome: "Led project management and technical oversight for development of five CUBE Catalog applications. Guided scope, validation approach, and application to three major projects — I-35 UBOL staging benefit/cost analysis, northwest metro construction impact analysis (2022–2023), and I-94 CPR staging alternatives — demonstrating the ability to translate advanced modeling capabilities into practical, reusable agency tools."
      }
    ],
    projects: [
      "Tool Development — Work Zone Queue-Delay Excel Model (multi-configuration)",
      "Model Development — DynusT ODME Calibration (SOV/HOV/Truck)",
      "Phase I & II — Met Council ABM Work Zone CUBE Catalog Applications",
      "SP 8825-1012 — TH 61 Queue Delay Model & Sensitivity Testing",
      "SP 7005-143 — Freeway Queue Delay Model Calibration",
      "SP 1906-71 — US 52 CUBE Regional Model Analysis",
      "SP 6242-83 — TH 280 Diversion Model & State Fair Estimation",
      "SP 2781-544 — I-94 Dartmouth Diversion Volume Modeling",
      "SP 2772-125 — TH 169 Queue Delay Model",
      "SP 2713-129 — TH 12 ClearGuide Travel Time Model",
      "SP 2732-105 — TH 5 Impact Analysis"
    ]
  }
};

function openModal(serviceId) {
  const data = SERVICE_DATA[serviceId];
  if (!data) return;

  const overlay  = document.getElementById("service-modal");
  const heroImg  = document.getElementById("modal-hero-img");
  const label    = document.getElementById("modal-label");
  const title    = document.getElementById("modal-title");
  const featured = document.getElementById("modal-featured");
  const projList = document.getElementById("modal-projects");

  heroImg.style.backgroundImage = `url('${data.image}')`;
  label.textContent  = data.label;
  title.textContent  = data.title;

  // Render featured projects
  featured.innerHTML = data.featured.map(p => `
    <div class="mfc">
      <p class="mfc-sp">${p.sp}</p>
      <h3>${p.name}</h3>
      <dl>
        <dt>Challenge</dt><dd>${p.challenge}</dd>
        <dt>Tools</dt><dd>${p.tools}</dd>
        <dt>Outcome</dt><dd>${p.outcome}</dd>
      </dl>
    </div>
  `).join("");

  // Render project list
  projList.innerHTML = data.projects.map(p => `<li>${p}</li>`).join("");

  overlay.removeAttribute("hidden");
  requestAnimationFrame(() => overlay.classList.add("is-open"));
  document.body.style.overflow = "hidden";

  // Focus the close button for accessibility
  document.getElementById("modal-close").focus();
}

function closeModal() {
  const overlay = document.getElementById("service-modal");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  overlay.addEventListener("transitionend", () => {
    overlay.setAttribute("hidden", "");
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  // Service card clicks
  document.querySelectorAll(".service-grid-card[data-service]").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.service));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.service);
      }
    });
  });

  // Close button
  document.getElementById("modal-close").addEventListener("click", closeModal);

  // Click outside panel to close
  document.getElementById("service-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
