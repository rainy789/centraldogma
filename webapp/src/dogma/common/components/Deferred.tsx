/*
 * Copyright 2022 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import React, { ReactNode } from 'react';

interface LoadingProps {
  isLoading: boolean;
  error: any;
  children: () => ReactNode;
}
export const Deferred = (props: LoadingProps) => {
  if (props.isLoading) {
    // TODO(ikhoon): Add a loading indicator/spinner.
    return <div>Loading...</div>;
  }

  if (props.error) {
    // TODO(ikhoon): Link to an error page.
    return <div>Link to an error page</div>;
  }

  return <div>{props.children()}</div>;
};
