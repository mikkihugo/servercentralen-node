const fs = require('fs');

module.exports = {
  exists: async (path) => new Promise((resolve) => {
    fs.exists(path, (exists) => {
      if (exists) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }),
  unlink: async (path) => new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  }),
  rename: async (oldPath, newPath) => new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  }),
  copyFile: async (oldPath, newPath) => new Promise((resolve, reject) => {
    fs.copyFile(oldPath, newPath, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.unlink(oldPath, (err1) => {
          reject(err1);
        });
        resolve(true);
      }
    });
  }),
  mkdir: async (path, options) => new Promise((resolve, reject) => {
    fs.mkdir(path, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  }),
  stat: async (path) => new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  }),
  lstat: async (path) => new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  }),
};
