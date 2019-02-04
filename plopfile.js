module.exports = function (plop) {
  // controller generator
  plop.setGenerator('node', {
    description: 'Generate a new Node',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name of the Node'
    }],
    actions: [{
      type: 'add',
      path: 'src/classes/nodes/{{name}}.js',
      templateFile: 'generators/node.hbs'
    }]
  });
};