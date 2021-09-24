import { IsArray, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class articleDTO {
  @IsNotEmpty()
  readonly title: string;

  readonly image: string;
  @IsNotEmpty()
  readonly body: string;

  readonly author: string;

  readonly categories: string[];

  readonly favorite: string[];

  readonly created_time: number;
}

export class createArticleDTO {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  body: string;

  @IsArray()
  categories: string[];
}

export class findOptionDTO {
  author: string;

  categories: string;
}

export class updateArtDTO {
  readonly title: string;

  readonly image: string;

  readonly body: string;

  readonly categories: string[];
}
