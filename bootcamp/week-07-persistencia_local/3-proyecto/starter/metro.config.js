const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Deshabilitar Hermes bytecode para compatibilidad web
delete config.transformer.hermesBytecode;

module.exports = config;
