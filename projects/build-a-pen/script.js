 // -----------------------
    // STATE
    // -----------------------
    const maxComplexity = 1000;
    let complexity = 50;
    let specialists = 3;
    let years = 0.5;
    let countries = 1;
    let money = 5;
    let materialsClicks = 0;

    const views = {
      intro: document.getElementById("view-intro"),
      materials: document.getElementById("view-materials"),
      summary: document.getElementById("view-summary"),
    };

    const complexityBar = document.getElementById("complexityBar");
    const complexityLabel = document.getElementById("complexityLabel");
    const statSpecialists = document.getElementById("statSpecialists");
    const statYears = document.getElementById("statYears");
    const statCountries = document.getElementById("statCountries");
    const statMoney = document.getElementById("statMoney");
    const materialsClicksLabel = document.getElementById(
      "materialsClicksLabel"
    );
    const sideHint = document.getElementById("sideHint");
    const eventLog = document.getElementById("eventLog");

    const summaryComplexityLabel = document.getElementById(
      "summaryComplexityLabel"
    );
    const summarySpecialistsChip = document.getElementById(
      "summarySpecialistsChip"
    );
    const summaryCountriesChip = document.getElementById(
      "summaryCountriesChip"
    );
    const summaryYearsChip = document.getElementById("summaryYearsChip");
    const summaryMoneyChip = document.getElementById("summaryMoneyChip");

    const btnStart = document.getElementById("btnStart");
    const btnSkipToSummary = document.getElementById("btnSkipToSummary");
    const btnJumpSummarySmall =
      document.getElementById("btnJumpSummarySmall");
    const btnForceEvent = document.getElementById("btnForceEvent");
    const btnReplay = document.getElementById("btnReplay");

    const modalBackdrop = document.getElementById("modalBackdrop");
    const modalKicker = document.getElementById("modalKicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalDeltas = document.getElementById("modalDeltas");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalAcceptBtn = document.getElementById("modalAcceptBtn");

    let pendingDelta = null;

    // Material definitions
    const materialsData = {
      graphite: {
        kicker: "Graphite supply",
        title: "You discover… the good graphite is in someone else’s war.",
        body: `
          To get high-quality graphite, you need access to a specific kind of
          mine. Historically, that was a single valley in England. If your
          country is at war or simply not invited to the trade party, you’re
          stuck with low-grade powder and lots of clay experiments.
          <ul>
            <li>You don’t just “mine some graphite” — you negotiate history.</li>
            <li>People like Conté had to literally invent new processes just to keep writing.</li>
            <li>Your pen quietly inherits that innovation, for free.</li>
          </ul>
        `,
        delta: {
          complexity: 120,
          specialists: 120,
          years: 40,
          countries: 2,
          money: 5000000,
        },
        logTag: "Geopolitics",
        logText:
          "Your graphite needs a treaty more than a shovel. You just hired diplomats.",
      },
      plastic: {
        kicker: "Plastic body",
        title: "Your pen wants an oil industry.",
        body: `
          A plastic pen body starts as crude oil pulled from underground at
          massive cost and risk. Then:
          <ul>
            <li>You build pipelines, rigs, refineries, cracking units.</li>
            <li>You turn thick, dangerous goo into neat, obedient nerdles.</li>
            <li>You feed those into molds that cost more than houses.</li>
          </ul>
          By the time you’re holding a cheap blue pen, you’re casually holding
          the ghosts of billion-dollar decisions.
        `,
        delta: {
          complexity: 220,
          specialists: 450,
          years: 70,
          countries: 4,
          money: 500000000,
        },
        logTag: "Industrial scale",
        logText:
          "To make one plastic tube, you quietly spun up a mini-fossil-fuel empire.",
      },
      metal: {
        kicker: "Precision metal",
        title: "The tip is a tiny engineering thesis.",
        body: `
          The ball in a ballpoint pen has to be perfectly round, perfectly
          seated, and not scratch the paper. That means:
          <ul>
            <li>Steel or brass with the right hardness and corrosion resistance.</li>
            <li>Machines that can grind and polish spheres fractions of a millimetre wide.</li>
            <li>Quality control so your pen doesn’t die halfway through an exam.</li>
          </ul>
          You’re not just “making a little ball.” You’re paying for generations
          of people who hated defects more than you hate bad handwriting.
        `,
        delta: {
          complexity: 180,
          specialists: 260,
          years: 50,
          countries: 3,
          money: 80000000,
        },
        logTag: "Precision",
        logText:
          "You just bought machine tools that care more about circles than you ever will.",
      },
      ink: {
        kicker: "Ink formulation",
        title: "Ink is polite poison that agreed to behave.",
        body: `
          Good ink dries quickly, flows smoothly, doesn’t fade, and ideally
          doesn’t demolish your organs. To get there:
          <ul>
            <li>Chemists play with solvents, dyes, surfactants, resins.</li>
            <li>They test for lightfastness, temperature, viscosity, toxicity.</li>
            <li>Regulators quietly make sure your revision notes won’t glow in the dark.</li>
          </ul>
          Every “smooth writing” marketing line is really a stack of failed
          experiments you never had to pay for directly.
        `,
        delta: {
          complexity: 260,
          specialists: 600,
          years: 90,
          countries: 4,
          money: 150000000,
        },
        logTag: "Chemistry",
        logText:
          "You just hired a small army of chemists so your pen wouldn’t smell like doom.",
      },
    };

    // Random complication events
    const complicationEvents = [
      {
        kicker: "Regulation",
        title: "The safety inspector would like a word.",
        body: `
          Your ink happens to be flammable, your plastic sheds microplastics,
          and your factory sits on a fault line of twelve different regulations.
          Before a single pen leaves the building, you owe:
          <ul>
            <li>fire tests, toxicity tests, drop tests;</li>
            <li>radio interference checks if your machines emit anything;</li>
            <li>a small pile of paperwork taller than your ego.</li>
          </ul>
        `,
        delta: {
          complexity: 90,
          specialists: 80,
          years: 10,
          countries: 1,
          money: 20000000,
        },
        logTag: "Regulation",
        logText:
          "Your pen survived the regulators. Your startup’s optimism did not.",
      },
      {
        kicker: "Public perception",
        title: "The internet has decided your pen is evil.",
        body: `
          Overnight, a viral thread calls your single-use plastic pen “micro-doom.”
          School boards switch to pencils. Offices ban freebies. Your PR team now
          works harder than your engineers.
          <ul>
            <li>Packaging re-design.</li>
            <li>Recycling program you should’ve done earlier.</li>
            <li>Very sincere videos with soft piano music.</li>
          </ul>
        `,
        delta: {
          complexity: 60,
          specialists: 60,
          years: 5,
          countries: 1,
          money: 10000000,
        },
        logTag: "Perception",
        logText:
          "Your pen technically works, but vibes legislation is stricter than actual law.",
      },
      {
        kicker: "Patents & trade",
        title: "Someone already owns that clever little mechanism.",
        body: `
          You proudly design a smooth new clicker system, only to discover three
          different companies have overlapping patents on it in different
          jurisdictions. You now must:
          <ul>
            <li>Pay licensing fees,</li>
            <li>re-engineer around the patent, or</li>
            <li>gamble that nobody sues a small fish. (They might.)</li>
          </ul>
        `,
        delta: {
          complexity: 100,
          specialists: 90,
          years: 15,
          countries: 2,
          money: 50000000,
        },
        logTag: "Patents",
        logText:
          "You just learned the phrase “freedom to operate” the hard, expensive way.",
      },
      {
        kicker: "Artificial demand",
        title: "Nobody actually asked for a better pen.",
        body: `
          The world already has a thousand perfectly fine pens. To justify your
          existence, you’re not solving a problem. You’re creating one:
          <ul>
            <li>“Ergonomic ultra-grip.”</li>
            <li>“Hyper-smooth quick-dry ink.”</li>
            <li>“Limited edition collaboration with a cartoon duck.”</li>
          </ul>
          Half your budget now goes to marketing, not engineering.
        `,
        delta: {
          complexity: 70,
          specialists: 60,
          years: 7,
          countries: 1,
          money: 30000000,
        },
        logTag: "Demand",
        logText:
          "You successfully convinced people their old pens were emotionally inadequate.",
      },
    ];

    // -----------------------
    // UI helpers
    // -----------------------
    function switchView(name) {
      Object.entries(views).forEach(([key, el]) => {
        el.classList.toggle("active", key === name);
      });
    }

    function formatMoney(num) {
      if (num < 1000) return `₹ ${num.toFixed(0)}`;
      if (num < 1_000_000) return `₹ ${(num / 1000).toFixed(1)}K`;
      if (num < 1_000_000_00) return `₹ ${(num / 1_000_00).toFixed(1)}L`;
      return `₹ ${(num / 1_000_000_00).toFixed(1)}Cr`;
    }

    function updateHUD() {
      const pct = Math.min(100, (complexity / maxComplexity) * 100);
      complexityBar.style.width = pct + "%";

      let labelText = "Civilization required: Beginner";
      if (pct > 15) labelText = "Civilization required: Village + Library";
      if (pct > 35) labelText = "Civilization required: Industrial Revolution DLC";
      if (pct > 60) labelText = "Civilization required: Global Supply Chain";
      if (pct > 85) labelText = "Civilization required: Late-stage Capitalism";

      complexityLabel.textContent = labelText;

      statSpecialists.textContent = Math.round(specialists);
      statYears.textContent = years.toFixed(1);
      statCountries.textContent = Math.round(countries);
      statMoney.textContent = formatMoney(money);

      materialsClicksLabel.textContent = `Decisions made: ${materialsClicks}`;
    }

    function logEvent(tag, text) {
      const pill = document.createElement("div");
      pill.className = "event-pill";
      pill.innerHTML = `<span class="tag">${tag}</span><strong>${text}</strong>`;
      eventLog.prepend(pill);
    }

    function openModal(data, isComplication = false) {
      modalKicker.textContent = isComplication ? data.kicker : data.kicker;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.body;

      modalDeltas.innerHTML = "";
      const d = data.delta;
      const fields = [
        ["Complexity", d.complexity, "complexity"],
        ["Specialists", d.specialists, "specialists"],
        ["Years of R&D", d.years, "years"],
        ["Hidden money", d.money, "money"],
      ];
      fields.forEach(([label, val]) => {
        const pill = document.createElement("div");
        pill.className = "delta-pill positive";
        pill.textContent = `+${label}`;
        modalDeltas.appendChild(pill);
      });

      pendingDelta = data;
      modalBackdrop.classList.add("active");
    }

    function closeModal() {
      modalBackdrop.classList.remove("active");
      pendingDelta = null;
    }

    function applyDelta(delta, logTag, logText) {
      if (!delta) return;
      complexity += delta.complexity;
      specialists += delta.specialists;
      years += delta.years;
      countries += delta.countries;
      money += delta.money;
      updateHUD();
      if (logTag && logText) logEvent(logTag, logText);
    }

    function goToSummary() {
      switchView("summary");
      const pct = Math.min(100, (complexity / maxComplexity) * 100);
      summaryComplexityLabel.textContent = `${pct.toFixed(0)}%`;
      summarySpecialistsChip.textContent = `~${Math.round(
        specialists
      )} specialists quietly involved`;
      summaryCountriesChip.textContent = `Across ${Math.round(
        countries
      )} countries and trade zones`;
      summaryYearsChip.textContent = `Borrowing ~${years.toFixed(
        1
      )} years of R&D`;
      summaryMoneyChip.textContent = `With invisible costs somewhere around ${formatMoney(
        money
      )} (for the entire ecosystem, not your ₹5).`;

      sideHint.innerHTML =
        "<strong>Reflection unlocked:</strong> You can replay with different choices, but you can’t get the complexity back in the box.";
    }

    // -----------------------
    // Listeners
    // -----------------------
    btnStart.addEventListener("click", () => {
      switchView("materials");
      complexity = 80;
      specialists = 10;
      years = 2;
      countries = 1;
      money = 1000;
      materialsClicks = 0;
      eventLog.innerHTML = "";
      sideHint.innerHTML =
        "<strong>Step 1:</strong> Choose which part of the pen you want to recreate. Each card opens a small rabbit hole.";
      updateHUD();
    });

    btnSkipToSummary.addEventListener("click", goToSummary);
    btnJumpSummarySmall.addEventListener("click", goToSummary);

    btnReplay.addEventListener("click", () => {
      switchView("materials");
      complexity = 80;
      specialists = 10;
      years = 2;
      countries = 1;
      money = 1000;
      materialsClicks = 0;
      eventLog.innerHTML = "";
      sideHint.innerHTML =
        "<strong>Replay mode:</strong> Try a different starting point. Spoiler: it’s still surprisingly hard.";
      updateHUD();
    });

    document.querySelectorAll(".card-option").forEach((card) => {
      card.addEventListener("click", () => {
        const key = card.getAttribute("data-key");
        const data = materialsData[key];
        materialsClicks++;
        openModal(data, false);

        // After a few decisions, auto-nudge toward summary
        if (materialsClicks >= 3 && complexity > maxComplexity * 0.7) {
          sideHint.innerHTML =
            "<strong>Notice:</strong> You’ve already crossed the “totally unrealistic for one human” line. You can keep going… or jump to the uncomfortable summary.";
        }
      });
    });

    modalCloseBtn.addEventListener("click", closeModal);

    modalAcceptBtn.addEventListener("click", () => {
      if (!pendingDelta) return;
      const { delta, logTag, logText } = pendingDelta;
      applyDelta(delta, logTag, logText);
      closeModal();

      // Random chance to trigger a complication event
      if (Math.random() < 0.5) {
        const ev =
          complicationEvents[
            Math.floor(Math.random() * complicationEvents.length)
          ];
        openModal(ev, true);
        pendingDelta = ev;
      }

      // Auto-summary unlock if complexity is very high
      if (complexity > maxComplexity * 0.95) {
        setTimeout(() => {
          goToSummary();
        }, 300);
      }
    });

    btnForceEvent.addEventListener("click", () => {
      const ev =
        complicationEvents[
          Math.floor(Math.random() * complicationEvents.length)
        ];
      openModal(ev, true);
      pendingDelta = ev;
    });

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });



    // Go to timeline view
document.getElementById("btnBackToMaterials")?.addEventListener("click", () => {
  switchView("materials");
});

document.getElementById("btnBackFromMap")?.addEventListener("click", () => {
  switchView("summary");
});


    // -----------------------
    // Background canvas: orbiting nodes that react to complexity
    // -----------------------
    const canvas = document.getElementById("bg");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resizeCanvas);

    const nodes = [];
    const baseNodeCount = 40;

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < baseNodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 1 + Math.random() * 2,
        });
      }
    }

    initNodes();

    function drawBackground() {
      ctx.clearRect(0, 0, width, height);

      // subtle gradient
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.1,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      g.addColorStop(0, "rgba(33, 39, 86, 0.35)");
      g.addColorStop(1, "rgba(2, 4, 10, 0.95)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // complexity-dependent parameters
      const pct = Math.min(1, complexity / maxComplexity);
      const maxDist = 80 + pct * 120;
      const lineAlpha = 0.08 + pct * 0.12;
      const nodeAlpha = 0.25 + pct * 0.2;

      // update nodes
      for (const n of nodes) {
        n.x += n.vx * (1 + pct * 2);
        n.y += n.vy * (1 + pct * 2);

        if (n.x < -50) n.x = width + 50;
        if (n.x > width + 50) n.x = -50;
        if (n.y < -50) n.y = height + 50;
        if (n.y > height + 50) n.y = -50;
      }

      // draw connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * lineAlpha;
            ctx.strokeStyle = `rgba(143, 156, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 203, 255, ${nodeAlpha})`;
        ctx.fill();
      }

      requestAnimationFrame(drawBackground);
    }

    drawBackground();
    updateHUD();