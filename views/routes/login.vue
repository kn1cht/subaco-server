<template>
  <section class="container">
    <form action="/login" method="post" class="col-lg-6">
      <div class="panel panel-info">
        <div class="panel-heading">
          登録済みのアカウントでログイン
        </div>
        <div class="panel-body">
          <div class="input-group col-sm-8">
            <span class="input-group-addon" id="username-addon">ユーザID</span>
            <input type="text" name="username" class="form-control" placeholder="username" aria-describedby="username-addon">
          </div>
          <br>
          <div class="input-group col-sm-8">
            <span class="input-group-addon" id="password-addon">パスワード</span>
            <input type="password" name="password"  class="form-control"  placeholder="password" aria-describedby="password-addon">
          </div>
        </div>
        <div class="panel-footer">
          <button type="submit" class="btn btn-success">ログイン</button>
        </div>
      </div>
    </form>

    <h3 style="clear:both;">開発中環境用 テストユーザ</h3>
    <p>
      Id: <b>testuser</b><br>
      Pass: <b>t3stUs3r</b>
    </p>
  </section>
</template>