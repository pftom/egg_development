'use strict';

const Controller = require('egg').Controller;

class ProfileController extends Controller {
  async addProfile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields._id) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);

    try {
      await awaitWriteStream(stream.pipe(writeStream));

      const body = { ...stream.fields, image: '/public/' + filename };
      const newProfile = new ctx.model.Profile(body);
      await newProfile.save();
      const { _id } = newProfile;

      ctx.body = {
        id: _id,
        msg: 'add profile successfully!',
      };
      ctx.status = 201;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async getProfile() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    try {
      const profile = await ctx.model.Profile.find({ userId: id });

      ctx.body = profile[0];
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async updateProfile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields._id) + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);

    try {
      await awaitWriteStream(stream.pipe(writeStream));

      const body = { ...stream.fields, image: '/public/' + filename };
      const { _id } = body;
      await ctx.model.Profile.update(
        { _id },
        { $set: { ...body } }
      );

      ctx.body = {
        id: _id,
        msg: 'update profile successfully!',
      };
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }
}

module.exports = ProfileController;