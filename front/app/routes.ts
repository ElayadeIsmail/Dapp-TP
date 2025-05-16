import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./components/layout.tsx", [
    index("routes/home.tsx"),
    route("exercice/:id", "./routes/exercice.tsx"),
  ]),
] satisfies RouteConfig;
