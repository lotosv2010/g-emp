class GEMPScript {
  async exec(name, options) {
    await require(`./${name}`).setup(options);
  }
}

module.exports = new GEMPScript();