import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readPost } from './posts';
const content = '---\ntitle: A discovery\ndescription: Notes on discovery\ndate: "2026-11-06"\ncategory: Networking\n---\nHello.';
test('reads original posts and curated sources',()=>{assert.equal(readPost('discovery',content).content.trim(),'Hello.'); assert.equal(readPost('discovery',content.replace('category: Networking','category: Networking\nsource: https://example.com/article')).source,'https://example.com/article');});
test('rejects missing metadata and unsafe source links',()=>{assert.throws(()=>readPost('broken','Hello'));assert.throws(()=>readPost('broken',content.replace('category: Networking','category: Networking\nsource: javascript:alert(1)')));});
