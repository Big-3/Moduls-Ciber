# Class: PaillierPrivateKey

## Table of contents

### Constructors

- [constructor](PaillierPrivateKey.md#constructor)

### Methods

- [decrypt](PaillierPrivateKey.md#decrypt)
- [getLambda](PaillierPrivateKey.md#getlambda)
- [getMu](PaillierPrivateKey.md#getmu)
- [getPubKey](PaillierPrivateKey.md#getpubkey)

## Constructors

### constructor

• **new PaillierPrivateKey**(`lambda`, `mu`, `pubKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lambda` | `bigint` |
| `mu` | `bigint` |
| `pubKey` | [`PaillierPublicKey`](PaillierPublicKey.md) |

#### Defined in

Paillier.ts:51

## Methods

### decrypt

▸ **decrypt**(`c`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `bigint` |

#### Returns

`bigint`

#### Defined in

Paillier.ts:69

___

### getLambda

▸ **getLambda**(): `bigint`

#### Returns

`bigint`

#### Defined in

Paillier.ts:57

___

### getMu

▸ **getMu**(): `bigint`

#### Returns

`bigint`

#### Defined in

Paillier.ts:61

___

### getPubKey

▸ **getPubKey**(): [`PaillierPublicKey`](PaillierPublicKey.md)

#### Returns

[`PaillierPublicKey`](PaillierPublicKey.md)

#### Defined in

Paillier.ts:65
