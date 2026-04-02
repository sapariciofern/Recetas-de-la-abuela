import "animate.css";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------
    FILTRO POR COMUNIDAD AUTÓNOMA
  --------------------------------------------------- */
  const select = document.getElementById("comunidad_autonoma");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const recetas = document.querySelectorAll(".grid-cards li");

  if (select && btnLimpiar && recetas.length > 0) {

    select.addEventListener("change", () => {
      const filtro = select.value;

      btnLimpiar.style.display = filtro ? "inline-block" : "none";

      recetas.forEach(receta => {
        const lugar = receta.getAttribute("data-lugar");

        receta.style.display =
          filtro === "" || lugar === filtro ? "block" : "none";
      });
    });

    btnLimpiar.addEventListener("click", () => {
      select.value = "";
      btnLimpiar.style.display = "none";

      recetas.forEach(receta => {
        receta.style.display = "block";
      });
    });
  }

  /* ---------------------------------------------------
    CÁLCULO DE INGREDIENTES POR PERSONAS 
  --------------------------------------------------- */
  const selectPersonas = document.getElementById("personas");
  const listaOriginal = document.querySelectorAll("#ingredientes-originales li");
  const listaCalculada = document.getElementById("ingredientes-calculados");
  const btnPersonas = document.getElementById("btnPersonas");
  const h4 = document.getElementById("personas-originales");
  const mensajePersonas = document.getElementById("mensaje-personas");
  const ingredientesRecalculados = document.getElementById("ingredientes-recalculados");

  if (selectPersonas && listaOriginal.length > 0 && listaCalculada && btnPersonas && h4) {

    const personasOriginales = parseInt(h4.textContent.match(/\d+/)[0]);

    btnPersonas.style.display = "none";

    selectPersonas.addEventListener("change", () => {
      const personas = parseInt(selectPersonas.value);

      listaCalculada.innerHTML = "";

      if (personas === 0) {
        btnPersonas.style.display = "none";
        return;
      }

      if (personas === personasOriginales) {
        mensajePersonas.style.display = "block";
      }else {

        ingredientesRecalculados.style.display = "block";

        const factor = personas / personasOriginales;

        listaOriginal.forEach(ing => {
          const nombre = ing.textContent.split("—")[0].trim();
          const cantidadOriginal = parseFloat(ing.dataset.cantidad);
          const tipo = ing.dataset.tipo;

          let nuevaCantidad = cantidadOriginal * factor;

          if (tipo === "unidad") {
            if (nuevaCantidad < 0.25) nuevaCantidad = 0;
            else if (nuevaCantidad < 0.75) nuevaCantidad = 0.5;
            else nuevaCantidad = 1;
          } else {
            nuevaCantidad = Math.round(nuevaCantidad);
          }

          const li = document.createElement("li");

          if (tipo === "g") li.textContent = `${nombre} — ${nuevaCantidad} g`;
          else if (tipo === "ml") li.textContent = `${nombre} — ${nuevaCantidad} ml`;
          else li.textContent = `${nombre} — ${nuevaCantidad}`;

          listaCalculada.appendChild(li);
        });

        
      }

      btnPersonas.style.display = "inline-block";
      
    });

    btnPersonas.addEventListener("click", () => {
      selectPersonas.value = 0;
      listaCalculada.innerHTML = "";
      btnPersonas.style.display = "none";
      mensajePersonas.style.display = "none";
      ingredientesRecalculados.style.display = "none";
    });
  }

});
