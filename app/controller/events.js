'use strict';

const Controller = require('egg').Controller;

class EventsController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.body = await ctx.model.Events.find();
    ctx.status = 200;
  }

  async create () {
    const { ctx } = this;
    const body = ctx.request.body;
    const { title, content } = body;

    try {
      const newEvent = new ctx.model.Events({
        title,
        content,
      });

      await newEvent.save();
  
      const { _id } = newEvent;
      ctx.body = `
        created: ${title},
        id: ${_id},
      `;
      ctx.status = 201;
    } catch (e) {
      ctx.body = e.msg;
      ctx.status = 403;
    }
  }

  async show () {
    const { ctx } = this;
    const { id } = ctx.params;

    ctx.body = await ctx.model.Events.find({ _id: id });
    ctx.status = 200;
  }

  async update () {
    const { ctx } = this;
    const { request, params } = ctx;
    const body = request.body;
    const { id } = params;

    try {
      await ctx.model.Events.update(
        { _id: id },
        { $set: { ...body } }
      );

      ctx.body = 'Update successfully!';
      ctx.status = 200;
    } catch (e) {
      ctx.body = e.msg;
    } 
  }

  async destroy () {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      await ctx.model.Events.remove({ _id: id });

      ctx.body = 'Delete successfully!';
    } catch (e) {

      ctx.body = e.msg;
    }
  }
}

module.exports = EventsController;
