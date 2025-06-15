import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    PRODUCT_MS_HOST: string;
    PRODUCT_MS_PORT: number;
    ORDER_MS_HOST: string;
    ORDER_MS_PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_MS_HOST: joi.string().required(),
    PRODUCT_MS_PORT: joi.number().required(),
    ORDER_MS_HOST: joi.string().required(),
    ORDER_MS_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) throw new Error(`Configuración de vaidacion error: ${error.message}`);

const envVars: EnvVars = value;
export const envs = {
    port: envVars.PORT,
    product_ms_host: envVars.PRODUCT_MS_HOST,
    product_ms_port: envVars.PRODUCT_MS_PORT,
    order_ms_host: envVars.ORDER_MS_HOST,
    order_ms_port: envVars.ORDER_MS_PORT,
}
