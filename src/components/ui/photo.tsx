import "./photo.css";
import clsx from "clsx";
import defaultPhoto from "../../assets/default-profile.png";
import type { ComponentProps } from "react";

const Photo = ({ className, alt, src, ...props }: ComponentProps<"img">) => (
  <img
    className={clsx("photo", className)}
    src={src ?? defaultPhoto}
    alt={alt ?? "photo"}
    {...props}
  />
);

export default Photo;
