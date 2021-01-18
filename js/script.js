// animações
// debounce
const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
// animação
const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';
  
function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 4 / 5));
    target.forEach(function(element) {
      if((windowTop) > element.offsetTop) {
        element.classList.add(animationClass);
      } else {
        element.classList.remove(animationClass);
      }
    })
}
  
animeScroll();
  
if(target.length) {
    window.addEventListener('scroll', debounce(function() {
      animeScroll();
    }, 100));
}

// aplicar promoções
const precos = [];
for (let i = 0; i < 100; i++) {
    if(document.querySelectorAll(".preco") != null){
      precos[i] = window.document.querySelectorAll('.preco')[i].innerHTML;
  }
}

function aplicarPromo(porcentagem) {
    for (let i = 0; i < 100; i++) {
        window.document.querySelectorAll('.preco')[i].innerHTML = `${precos[i].toLocaleString('pt-BR', { minimumFractionDigits: 0})}`;

        let precos2 = window.document.querySelectorAll('.preco')[i].innerHTML.replace('.','');

        if (porcentagem < 1) {
            window.document.querySelectorAll('.preco')[i].innerHTML = `${(precos2 - ((porcentagem / 100) * precos2)).toLocaleString('pt-BR', { minimumFractionDigits: 0})}`;
        } else {
            window.document.querySelectorAll('.preco')[i].innerHTML = `<span class="preco-anterior">${precos[i]}</span>${(precos2 - ((porcentagem / 100) * precos2)).toLocaleString('pt-BR', { minimumFractionDigits: 0})}`;
        }
    }
}

// promoções de fins de semana
function promoMembro() {
    const membro = window.document.querySelector('.membro');
    const porcMembro = window.document.querySelector('.porc-membro');
    const tituloPromo = window.document.querySelector('.sub-aviso');
    const textoPromo = window.document.querySelector('.p-aviso');
    const headerPromo = window.document.querySelector('.promo-aviso-bg');
    const data = new Date();
    const diaHoje = data.getDay();
    const diasSemana = [1, 2, 3, 4, 5];
    const diaPromo = diasSemana.indexOf(diaHoje) === -1;

    if(diaPromo) {
        membro.setAttribute("onclick","aplicarPromo(10)");
        headerPromo.classList.add('show');
        porcMembro.innerText = '10%';
        tituloPromo.innerText = 'Aproveite';
        textoPromo.innerHTML = 'Promoção de <span>10%</span> ativada para todos os membros. Fique atento(a), válida apenas nos fins de semana.';
        for (let i = 0; i < 100; i++) {
            window.document.querySelectorAll('.preco')[i].innerHTML = `${precos[i].toLocaleString('pt-BR', { minimumFractionDigits: 0})}`;
            let precos2 = window.document.querySelectorAll('.preco')[i].innerHTML.replace('.','');
            window.document.querySelectorAll('.preco')[i].innerHTML = `<span class="preco-anterior">${precos[i]}</span>${(precos2 - ((10 / 100) * precos2)).toLocaleString('pt-BR', { minimumFractionDigits: 0})}`;
        }
    }
}
