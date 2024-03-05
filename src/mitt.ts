import mitt, { Emitter } from "mitt";

type Events = {
  foo: string;
};

export const emitter: Emitter<Events> = mitt<Events>();
