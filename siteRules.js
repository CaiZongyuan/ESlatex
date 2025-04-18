const siteRules = {
  'zhihu.com': {
    formulaSelector: 'span.ztext-math',
    getFormula: (element) => {
      return element.getAttribute('data-tex');
    }
  }
  // 可以继续添加其他网站的规则
}; 