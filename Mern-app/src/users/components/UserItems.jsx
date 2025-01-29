import React from "react";
import { Link } from "react-router-dom";

const UserItem = (props) => {
  return (
    <div className="flex bg-neutral-950 list-none items-center justify-center py-8 h-[calc(100vh-8ch)]">
      {/* is it backtrix used for injecting value */}
      <Link
        to={`/${props.name}/places`}
        className="w-full flex items-center justify-center"
      >
        {/* card component for UserItems */}
        <div className="flex gap-x-3 py-2 pl-3 pr-6 items-center justify-center bg-neutral-900 border border-neutral-800 w-fit hover:bg-yellow-400 hover:text-neutral-800 rounded-full group">
          <div className="w-12 h-12 rounded-full">
            <img
              src={props.image}
              alt={props.name}
              className="w-full object-cover h-full rounded-full object-center"
            />
          </div>
          <div className="flex flex-1 flex-col w-full hover:text-neutral-900">
            <h2 className="text-lg font-semibold text-yellow-400 group-hover:text-neutral-50">
              {props.name}
            </h2>
            <h3 className="text-base text-white">
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserItem;
