# @big3/ciber-modules - v0.0.1

My module description. Please update with your module data.

**`remarks`**
This module runs perfectly in node.js and browsers

## Table of contents

### Classes

- [PaillierPrivateKey](classes/PaillierPrivateKey.md)
- [PaillierPublicKey](classes/PaillierPublicKey.md)
- [RSAPrivateKey](classes/RSAPrivateKey.md)
- [RSAPublicKey](classes/RSAPublicKey.md)

### Functions

- [generatePaillierKeys](API.md#generatepaillierkeys)
- [generateRSAKeys](API.md#generatersakeys)

## Functions

### generatePaillierKeys

▸ **generatePaillierKeys**(`nbits?`): `Promise`<[`PaillierPrivateKey`](classes/PaillierPrivateKey.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `nbits` | `number` | `2048` |

#### Returns

`Promise`<[`PaillierPrivateKey`](classes/PaillierPrivateKey.md)\>

#### Defined in

Paillier.ts:99

___

### generateRSAKeys

▸ **generateRSAKeys**(`nbits?`): `Promise`<[`RSAPrivateKey`](classes/RSAPrivateKey.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `nbits` | `number` | `2048` |

#### Returns

`Promise`<[`RSAPrivateKey`](classes/RSAPrivateKey.md)\>

#### Defined in

[RSA.ts:76](https://github.com/Big-3/Moduls-Ciber/blob/90e9810/src/ts/RSA.ts#L76)
