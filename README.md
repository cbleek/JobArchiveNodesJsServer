# Job Archive

API for an archive of job postings.

## Table of Contents

* [Servers](#servers)
* [Paths](#paths)
  - [`POST` /signup](#op-post-signup) 
  - [`POST` /signin](#op-post-signin) 
  - [`POST` /logout](#op-post-logout) 
  - [`GET` /validateemail](#op-get-validateemail) 
  - [`GET` /api/user](#op-get-api-user) 
  - [`PUT` /api/user](#op-put-api-user) 
  - [`DELETE` /api/user](#op-delete-api-user) 
  - [`POST` /api/addjoblink](#op-post-api-addjoblink) 
  - [`GET` /api/listlinks](#op-get-api-listlinks) 
* [Schemas](#schemas)
  - 
  - 


<a id="servers" />
## Servers

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>Description</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://virtserver.swaggerhub.com/SJhumili/JobArchiveAPI/1.0.0" target="_blank">https://virtserver.swaggerhub.com/SJhumili/JobArchiveAPI/1.0.0</a></td>
      <td>SwaggerHub API Auto Mocking</td>
    </tr>
    <tr>
      <td><a href="http://localhost:8000" target="_blank">http://localhost:8000</a></td>
      <td>Test in localserver</td>
    </tr>
    <tr>
      <td><a href="https://api.yawik.org" target="_blank">https://api.yawik.org</a></td>
      <td>Test in api.yawik.org</td>
    </tr>
  </tbody>
</table>

<a name="security"></a>
## Security

<table class="table">
  <thead class="table__head">
    <tr class="table__head__row">
      <th class="table__head__cell">Type</th>
      <th class="table__head__cell">In</th>
      <th class="table__head__cell">Name</th>
      <th class="table__head__cell">Scheme</th>
      <th class="table__head__cell">Format</th>
      <th class="table__head__cell">Description</th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__body__row">
      <td class="table__body__cell">http</td>
      <td class="table__body__cell"></td>
      <td class="table__body__cell"></td>
      <td class="table__body__cell">bearer</td>
      <td class="table__body__cell">JWT</td>
      <td class="table__body__cell"></td>
    </tr>

  </tbody>
</table>

## Paths


### `POST` /signup
<a id="op-post-signup" />

> Create user

User be able to sign up with username, password, email. After sign up backend will send token to email.






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - New user successfully created.

###### Headers
_No headers specified_

##### ▶ default - The eamil is using by someone else.

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `POST` /signin
<a id="op-post-signin" />

> Sign in with email and password

User be able to sign into the system and server will respond access-token, and this access-token should be stored in session. This access-token will be used to use other api. Backend will identify user using access-token.






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - successful operation

###### Headers
##### X-Rate-Limit



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>X-Rate-Limit</td>
        <td>
          integer
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>



##### X-Expires-After



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>X-Expires-After</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>




###### application/xml



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>Response</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example
```xml
Bearer 35775k6dehgn678865k87k748o233
```
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>Response</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example
```json
"Bearer 35775k6dehgn678865k87k748o233"
```
##### ▶ 400 - Invalid email/password supplied

###### Headers
_No headers specified_

##### ▶ 404 - User not found

###### Headers
_No headers specified_

##### ▶ 422 - email/password not supplied

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `POST` /logout
<a id="op-post-logout" />

> Logs out current logged in user









#### Responses


##### ▶ 200 - User successfully log out.

###### Headers
_No headers specified_

##### ▶ default - Access token is missing or invalid

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `GET` /validateemail
<a id="op-get-validateemail" />

> Confirm user's email address





#### Query parameters

##### &#9655; token

this token is from backend after sign up


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>In</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>token  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>query</td>
        <td>this token is from backend after sign up</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - Email address has been confirmed.

###### Headers
_No headers specified_

##### ▶ default - Something went wrong

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `GET` /api/user
<a id="op-get-api-user" />

> Get user information

An authenticated user be able to retrieve his or her information








#### Responses


##### ▶ 200 - successful operation

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
###### application/xml



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
##### ▶ 401 - Access token is missing or invalid

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `PUT` /api/user
<a id="op-put-api-user" />

> Update user profile

An authenticated user be able to update information.






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - User data successfully updated.

###### Headers
_No headers specified_

##### ▶ default - Access token is missing or invalid

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `DELETE` /api/user
<a id="op-delete-api-user" />

> Delete user

User be able to delete profile.








#### Responses


##### ▶ 200 - Your profile deleted successfully.

###### Headers
_No headers specified_

##### ▶ 401 - Access token is missing or invalid

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `POST` /api/addjoblink
<a id="op-post-api-addjoblink" />

> Post a link

An authenticated user be able to post a link






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>body</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - Job link added successfully.

###### Headers
_No headers specified_

##### ▶ 401 - Access token is missing or invalid

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

### `GET` /api/listlinks
<a id="op-get-api-listlinks" />

> Get Job lists

An authenticated user be able to retrieve joblinks




#### Query parameters

##### &#9655; type

if type='all' user be able to retrieve all jobads but not 'all' user will retrieve his own posted jobads


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>In</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>type </td>
        <td>
          string
        </td>
        <td>query</td>
        <td>if type='all' user be able to retrieve all jobads but not 'all' user will retrieve his own posted jobads</td>
        <td><code>all</code>, <code>mine</code></td>
      </tr>
  </tbody>
</table>

##### Example

```json
"all"
```





#### Responses


##### ▶ 200 - Job links

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>Response</td>
        <td>
          array(string)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
[
  "string"
]
```
##### ▶ 401 - Access token is missing or invalid

###### Headers
_No headers specified_


#### Tags

<div class="tags">
  <div class="tags__tag"></div>
</div>
</div>

## Schemas

<a id="" />

#### User

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>

##### Example _(generated)_

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
<a id="" />

#### SigninRequest

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>email</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>

##### Example _(generated)_

```json
{
  "email": "string",
  "password": "string"
}
```
