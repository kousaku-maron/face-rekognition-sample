# Get Started

### 1.環境変数の設定
`.env`ファイルを作成して、アクセスキー、シークレットキー、リージョンを登録する。書き方は`.sample.env`を参照。
※環境変数としてexportしてしまってもいい。

アクセスキー関連はAWSのIAMにて、`AmazonS3FullAccess`, `AmazonRekognitionFullAccess`を付与させた物を利用すること。
→付与させないと、プログラムからawsのリソースにアクセスできない。

### 2.モジュールのインストール

下記コマンドで必要なモジュールをインストールする。

```
yarn
```

### 3.Bucket(S3), Collection(rekognition)の作成

下記コマンドを実行すると、`bucket`と`collection`が作成される。

```
yarn prepare
```

### 4.顔を登録させる

人物ごとにフォルダ(`assets/register/xxxx`)をきり、登録させる画像を置く。
ここで登録したもので顔判定を行うため、はっきり写っている写真推奨。

例:
人物名`hogehhoge`の場合、`assets/register/hogehoge/image01.png`,`assets/register/hogehoge/image02.png`を用意する。

下記コマンドで、`bucket`にアップロードおよび、`index`に顔情報を登録する。

```
yarn register [xxxx]
```

※引数にフォルダパスを与えて実行できるように改良すると良い感じになると思う。(誰か頑張って)

### 5.顔を判定する

判別させたい画像を`assets/search`に保存する。
複数枚おいてもいいが、画像ファイル以外置かないこと。

下記コマンドで、`bucket`にアップロードおよび、`index`に顔情報を問い合わせる。

```
yarn search
```

※引数にフォルダパスを与えて実行できるように改良すると良い感じになると思う。(誰か頑張って)

### 6.Bucket(S3), Collection(rekognition)を削除す

下記コマンドで`bucket`と`collection`を削除できる。

```
yarn clear
```
