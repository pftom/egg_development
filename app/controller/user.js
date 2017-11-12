'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const body = ctx.request.body;

    const { userName, password } = body;

    try {
      const newUser = new ctx.model.User({
        userName,
        password,
      });
      await newUser.save();

      const { _id } = newUser;
      ctx.body = {
        id: _id,
        msg: 'user create successfully!',
      };
      ctx.status = 201;
    } catch (e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async login() {
    const { ctx } = this;
    const body = ctx.request.body;

    const { userName, password } = body;

    try {
      const user = await ctx.model.User.find({ userName });

      if (user.length !== 0 && user[0].password === password) {
        const { _id } = user[0];

        ctx.body = {
          id: _id,
          msg: 'user login successfully!',
        };
        ctx.status = 200;
      }
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async changePassword() {
    const { ctx } = this;
    const { password, id } = ctx.request.body;

    try {
      await ctx.model.User.update(
        { _id: id },
        { $set: { password } },
      );

      ctx.body = {
        id,
        msg: 'update password successfully!',
      };
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async getAllUser() {
    const { ctx } = this;
    
    try {
      ctx.body = await ctx.model.User.find();
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async getUser() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const user = await ctx.model.User.find({ _id: id });

      ctx.body = user[0];
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }

  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      await ctx.model.User.remove({ _id: id });

      ctx.body = 'Delete user successfully!';
      ctx.status = 200;
    } catch(e) {
      ctx.body = e.msg;
      ctx.status = 500;
    }
  }
}

module.exports = UserController;