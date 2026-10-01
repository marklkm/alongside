(() => {
  const body = document.body;
  const controls = {
    textIncrease: "large-text",
    dyslexicFont: "dyslexic-font",
    highContrast: "high-contrast"
  };

  function setPressed(id, active) {
    const button = document.getElementById(id);
    if (button) button.setAttribute("aria-pressed", String(active));
  }

  function applySaved() {
    Object.entries(controls).forEach(([id, className]) => {
      const active = localStorage.getItem("dc-" + id) === "true";
      body.classList.toggle(className, active);
      setPressed(id, active);
    });
  }

  Object.entries(controls).forEach(([id, className]) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.addEventListener("click", () => {
      const active = !body.classList.contains(className);
      body.classList.toggle(className, active);
      setPressed(id, active);
      localStorage.setItem("dc-" + id, String(active));
    });
  });

  document.getElementById("resetDisplay")?.addEventListener("click", () => {
    Object.entries(controls).forEach(([id, className]) => {
      body.classList.remove(className);
      setPressed(id, false);
      localStorage.removeItem("dc-" + id);
    });
  });

  applySaved();
})();