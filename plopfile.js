module.exports = function (plop) {
  plop.addHelper('upperCase', (txt) => txt.toUpperCase());
  // controller generator
  plop.setGenerator('node', {
    description: 'Generate a new Node',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name of the node'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Short description of the node'
    }],
    actions: [{
      type: 'add',
      path: 'src/classes/nodes/{{name}}.js',
      templateFile: 'generators/Node.hbs'
    },
    {
      type: 'add',
      path: 'src/components/detailMenus/{{name}}Menu.vue',
      templateFile: 'generators/NodeMenu.hbs'
    },
    {
      type: 'append',
      path: 'src/components/SideMenu.vue',
      pattern: '<!-- PLOP: APPEND -->',
      templateFile: 'generators/NodeListItem.hbs'
    },
    {
      type: 'append',
      path: 'src/classes/Canvas.js',
      pattern: '/* PLOP: APPEND IMPORT */',
      template: 'import {{ name }} from \'./nodes/{{ name }}.js\''
    },
    {
      type: 'append',
      path: 'src/classes/Canvas.js',
      pattern: '/* PLOP: APPEND CASE */',
      template: 'case \'{{ upperCase name }}\': node = new {{ name }}(this._canvas, this.watchCanvas); break'
    }]
  });
};