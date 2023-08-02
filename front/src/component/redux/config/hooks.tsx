import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RootState,store } from "./store";

export type DispatchType=typeof store.dispatch
export const DispatchApp=()=>useDispatch<DispatchType>()

export const SelectorApp:TypedUseSelectorHook<RootState>=useSelector
