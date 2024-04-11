import mitt, { Emitter } from "mitt";

type Events = {
  networkError: undefined;
  networkOnline: undefined;
};

export const emitter: Emitter<Events> = mitt<Events>();
