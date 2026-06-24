import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "@/keystatic.config";

// Dynamic page - admin UI uses client-side rendering
export default makePage(keystaticConfig);
