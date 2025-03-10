import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddCourseInput = {
  courseCollection: Scalars['String']['input'];
  courseDescription: Scalars['String']['input'];
  courseDuration: Scalars['Int']['input'];
  courseOutcome: Scalars['String']['input'];
  courseTitle: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  courseCollection: Scalars['String']['output'];
  courseDescription: Scalars['String']['output'];
  courseDuration: Scalars['Int']['output'];
  courseOutcome: Scalars['String']['output'];
  courseTitle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CourseCollection = {
  __typename?: 'CourseCollection';
  courses: Array<Course>;
  name: Scalars['String']['output'];
};

export type CoursesInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCourse: Course;
  deleteCourse?: Maybe<Course>;
  login?: Maybe<AuthResponse>;
  register?: Maybe<Scalars['String']['output']>;
  updateCourse?: Maybe<Course>;
};


export type MutationAddCourseArgs = {
  input: AddCourseInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCourseInput;
};

export type Query = {
  __typename?: 'Query';
  collection: CourseCollection;
  collections: Array<CourseCollection>;
  course: Course;
  courses: Array<Course>;
};


export type QueryCollectionArgs = {
  id: Scalars['String']['input'];
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  input?: InputMaybe<CoursesInput>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateCourseInput = {
  courseCollection?: InputMaybe<Scalars['String']['input']>;
  courseDescription?: InputMaybe<Scalars['String']['input']>;
  courseDuration?: InputMaybe<Scalars['Int']['input']>;
  courseOutcome?: InputMaybe<Scalars['String']['input']>;
  courseTitle?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCourseInput: AddCourseInput;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Course: ResolverTypeWrapper<Course>;
  CourseCollection: ResolverTypeWrapper<CourseCollection>;
  CoursesInput: CoursesInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateCourseInput: UpdateCourseInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCourseInput: AddCourseInput;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  Course: Course;
  CourseCollection: CourseCollection;
  CoursesInput: CoursesInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  UpdateCourseInput: UpdateCourseInput;
  User: User;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = {
  courseCollection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courseDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courseDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  courseOutcome?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courseTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CourseCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CourseCollection'] = ResolversParentTypes['CourseCollection']> = {
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCourse?: Resolver<ResolversTypes['Course'], ParentType, ContextType, RequireFields<MutationAddCourseArgs, 'input'>>;
  deleteCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  register?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'password' | 'username'>>;
  updateCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  collection?: Resolver<ResolversTypes['CourseCollection'], ParentType, ContextType, RequireFields<QueryCollectionArgs, 'id'>>;
  collections?: Resolver<Array<ResolversTypes['CourseCollection']>, ParentType, ContextType>;
  course?: Resolver<ResolversTypes['Course'], ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType, Partial<QueryCoursesArgs>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  CourseCollection?: CourseCollectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

