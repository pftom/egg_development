'use strict';

const Controller = require('egg').Controller;

class ProfileController extends Controller {
  async addProfile() {
    const { ctx } = this;
    const body = ctx.request.body;

    try {
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

  async editProfile() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { _id } = body;

    try {
      await ctx.model.Profile.update(
        { _id },
        { $set: { ...body } },
      )

      ctx.body = 'change profile successfully!'
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.statsu = 500;
    }
  }
}

module.exports = ProfileController;