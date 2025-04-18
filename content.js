let activeFormula = null;
let copyButton = null;

function createCopyButton() {
  if (copyButton) return copyButton;
  
  copyButton = document.createElement('button');
  copyButton.className = 'latex-copy-btn';
  copyButton.textContent = '复制LaTeX';
  copyButton.style.display = 'none';
  document.body.appendChild(copyButton);
  
  copyButton.addEventListener('mouseover', (e) => {
    e.stopPropagation();
    copyButton.style.display = 'block';
  });
  
  return copyButton;
}

function copyToClipboard(text) {
  const cleanFormula = text.replace(/\\\tag{\d+}/, '').trim();
  const formula = `$${cleanFormula}$`;
  navigator.clipboard.writeText(formula);
}

function init() {
  const button = createCopyButton();
  
  let debounceTimer;
  
  document.addEventListener('mouseover', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const formula = e.target.closest('span.ztext-math');
      if (formula && formula !== activeFormula) {
        activeFormula = formula;
        const latexText = formula.getAttribute('data-tex');
        const rect = formula.getBoundingClientRect();
        
        button.style.display = 'block';
        button.style.top = `${rect.top + window.scrollY - 30}px`;
        button.style.left = `${rect.left + window.scrollX}px`;
        
        button.onclick = (event) => {
          event.stopPropagation();
          copyToClipboard(latexText);
          button.textContent = '已复制!';
          setTimeout(() => {
            button.textContent = '复制LaTeX';
          }, 1000);
        };
      }
    }, 100);
  });

  document.addEventListener('mouseout', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const formula = e.target.closest('span.ztext-math');
      const isOverButton = e.relatedTarget === button || button.contains(e.relatedTarget);
      
      if (!formula && !isOverButton) {
        button.style.display = 'none';
        activeFormula = null;
      }
    }, 200);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      init();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
}); 