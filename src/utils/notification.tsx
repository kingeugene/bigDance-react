import { toast } from "react-toastify";

export default class Notify {
    public static success(content: string): void {
        toast.success(content, {
            position: toast.POSITION.TOP_LEFT,
        });
    }

    public static warning(content: string): void {
        toast.warn(content, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    public static error(content: string): void {
        toast.error(content, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
}
