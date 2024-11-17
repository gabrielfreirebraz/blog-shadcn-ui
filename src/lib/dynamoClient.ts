import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env._AWS_REGION ?? 'sa-east-1', 
  credentials: {
    accessKeyId: process.env._AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env._AWS_SECRET_ACCESS_KEY ?? ''
  }
});

const dynamoDB = DynamoDBDocumentClient.from(client);
export default dynamoDB;
