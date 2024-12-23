import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.PRIVATE_AWS_REGION ?? 'sa-east-1', 
  credentials: {
    accessKeyId: process.env.PRIVATE_AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.PRIVATE_AWS_SECRET_ACCESS_KEY ?? ''
  }
});

const dynamoDB = DynamoDBDocumentClient.from(client);
export default dynamoDB;
