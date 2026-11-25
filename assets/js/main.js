/* AprendeSmart — scripts do site institucional (desenvolvido por SMK Cogit) */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu-principal");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
      toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("aberto")) {
        menu.classList.remove("aberto");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* Ano atual no rodapé */
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Revelar elementos ao rolar */
  var itens = document.querySelectorAll(".revelar");
  if ("IntersectionObserver" in window && itens.length) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visivel");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    itens.forEach(function (el) { obs.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* Formulário de contato
     Para ativar o envio real, preencha o atributo data-endpoint do <form>
     com a URL de um serviço de formulários (ex.: Formspree, Getform)
     ou de uma API própria que aceite POST em JSON. */
  var form = document.getElementById("form-contato");
  if (form) {
    /* Pré-seleciona o plano vindo da página Plataforma (?plano=premium|familia) */
    var plano = new URLSearchParams(window.location.search).get("plano");
    var sel = form.querySelector("#plano");
    if (plano && sel && Array.prototype.some.call(sel.options, function (o) { return o.value === plano; })) sel.value = plano;

    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form__status";
      if (!form.checkValidity()) {
        status.textContent = "Confira os campos destacados antes de enviar.";
        status.classList.add("erro");
        form.reportValidity();
        return;
      }
      var endpoint = form.getAttribute("data-endpoint");
      var dados = {};
      new FormData(form).forEach(function (v, k) { dados[k] = v; });

      if (!endpoint) {
        status.textContent = "Obrigado, " + (dados.nome || "") + "! Recebemos seu interesse. O envio online está em configuração — em breve a equipe AprendeSmart entrará em contato.";
        status.classList.add("ok");
        form.reset();
        return;
      }

      var botao = form.querySelector("button[type=submit]");
      botao.disabled = true;
      status.textContent = "Enviando…";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(dados)
      }).then(function (r) {
        if (!r.ok) throw new Error("Falha no envio");
        status.textContent = "Mensagem enviada! Logo a equipe AprendeSmart responde você.";
        status.classList.add("ok");
        form.reset();
      }).catch(function () {
        status.textContent = "Não foi possível enviar agora. Tente novamente em alguns minutos.";
        status.classList.add("erro");
      }).finally(function () { botao.disabled = false; });
    });
  }
})();
