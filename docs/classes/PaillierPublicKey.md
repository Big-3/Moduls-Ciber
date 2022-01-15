# Class: PaillierPublicKey

## Table of contents

### Constructors

- [constructor](PaillierPublicKey.md#constructor)

### Methods

- [add](PaillierPublicKey.md#add)
- [encrypt](PaillierPublicKey.md#encrypt)
- [getG](PaillierPublicKey.md#getg)
- [getN](PaillierPublicKey.md#getn)
- [getN2](PaillierPublicKey.md#getn2)
- [multiply](PaillierPublicKey.md#multiply)

## Constructors

### constructor

• **new PaillierPublicKey**(`n`, `n2`, `g`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `bigint` |
| `n2` | `bigint` |
| `g` | `bigint` |

#### Defined in

Paillier.ts:10

## Methods

### add

▸ **add**(`cs`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cs` | `bigint`[] |

#### Returns

`bigint`

#### Defined in

Paillier.ts:33

___

### encrypt

▸ **encrypt**(`m`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `bigint` |

#### Returns

`bigint`

#### Defined in

Paillier.ts:28

___

### getG

▸ **getG**(): `bigint`

#### Returns

`bigint`

#### Defined in

Paillier.ts:24

___

### getN

▸ **getN**(): `bigint`

#### Returns

`bigint`

#### Defined in

Paillier.ts:16

___

### getN2

▸ **getN2**(): `bigint`

#### Returns

`bigint`

#### Defined in

Paillier.ts:20

___

### multiply

▸ **multiply**(`c`, `m`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `bigint` |
| `m` | `bigint` |

#### Returns

`bigint`

#### Defined in

Paillier.ts:41
