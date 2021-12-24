import { ScanCommandInput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { usersFixture } from '../../tests/fixtures/users';

export class Database {
  scan(input: ScanCommandInput): Promise<ScanCommandOutput> {
    return Promise.resolve({
      $metadata: '',
      Items: usersFixture,
    });
  }
}
