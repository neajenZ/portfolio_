import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // типизируем useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // типизируем useSelector