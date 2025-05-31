# SHORTURL

���M�׬O�@�� AWS Lambda �L���A���u���}�A�ȡA�䴩�u���}���͡B�K�X�O�@�B�I���έp�A�H�� S3 �ɮפW��ñ�W���}���͡C

## �ؿ����c

- `ShortUrlLambda/Functions/`�GLambda �D�n�\��]���͵u���}�B���ɡB���� S3 ñ�W���}�^
- `ShortUrlLambda/Models/`�G�ШD/�^����Ƽҫ�
- `ShortUrlLambda/Shared/`�G�@�Φ^���榡
- `ShortUrlLambda/Utils/`�G���U�u��]�p�u�X���͡B����^
- `ShortUrlLambda/Properties/`�GLambda ����]�w

## �D�n�\��

- ���͵u���}�]�i��K�X�O�@�^
- �z�L�u�X���ɭ�l���}�A�òέp�I������
- ���� S3 �W��/�U��ñ�W���}�A�䴩�Ϥ��]webp�^�P�v���]mp4/webm�^

## �ֳt�}�l

### 1. �w�ˬ̮ۨM��

```powershell
# �٭� .NET �̮ۨM��
 dotnet restore
```

### 2. �w�� AWS Lambda �u��

```powershell
dotnet tool install -g Amazon.Lambda.Tools
```

### 3. ���p�� AWS Lambda

```powershell
# ���p�� AWS Lambda�A�бN <FunctionName> �������A�� Lambda ��ƦW��
 dotnet lambda deploy-function <FunctionName>
```

## API �d��

### ���͵u���}

- ���|�G`/generate-short-url`
- ��k�GPOST
- Body �d�ҡG

```json
{
  "originalUrl": "https://example.com",
  "pwd": "1234"
}
```

### ���ɵu���}

- ���|�G`/redirect/{code}`
- ��k�GPOST
- Body�]�p���K�X�^�G

```json
{
  "pwd": "1234"
}
```

### ���� S3 ñ�W���}

- ���|�G`/generate-s3-presigned-urls`
- ��k�GPOST
- Body �d�ҡG

```json
{
  "fileName": "test.webp",
  "contentType": "image/webp",
  "expireMinutes": 60,
  "fileSize": 123456
}
```

## �`�N�ƶ�

- �Ȥ䴩 webp �Ϥ��P mp4/webm �v���榡
- �Ϥ��̤j 5MB�A�v���̤j 50MB
- DynamoDB Table �W�١G`ShortUrls`
- S3 Bucket �W�١G`shorturl-bkt`

---

�p�ݧ�h�Ӹ`�A�аѦ� `ShortUrlLambda/Readme.md`�C
