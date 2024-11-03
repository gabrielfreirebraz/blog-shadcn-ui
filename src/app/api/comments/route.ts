import { NextRequest, NextResponse } from 'next/server';
import dynamoDB from '../../../lib/dynamoClient'; // Adjust path as needed
import { QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

// GET method to fetch comments
export async function GET(req: NextRequest): Promise<NextResponse> {
  const postId = req.nextUrl.searchParams.get('postId');

  const params = {
    TableName: 'comments',
    KeyConditionExpression: 'post_id = :postId',
    ExpressionAttributeValues: {
      ':postId': postId,
    },
  };

  try {
    const data = await dynamoDB.send(new QueryCommand(params));
    return NextResponse.json(data.Items, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
  }
}

// POST method to add a comment
export async function POST(req: NextRequest): Promise<NextResponse> {
  const ItemNewCommentDataApi: CommentDataApi = await req.json();

  const params = {
    TableName: 'comments',
    Item: ItemNewCommentDataApi,
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    return NextResponse.json({ message: 'Comment added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Error adding comment' }, { status: 500 });
  }
}
