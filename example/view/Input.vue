<template>
  <div class="input-demo">
    <div>
      <t-input v-model="input5" size="big" type="textarea" placeholder="请输入内容" />
    </div>
    <h2>大号输入框</h2>
    <div>
      <t-input v-model="input" value="123" size="big">
        <t-icon slot="prefix" name="close-o" />
        <t-icon slot="suffix" name="close-o" />
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <h2>迷你输入框</h2>
    <div>
      <t-input v-model="input" value="123" size="small">
        <t-icon slot="prefix" name="close-o" />
        <t-icon slot="suffix" name="close-o" />
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div>
      <t-input v-model="input" value="123">
        <t-icon slot="prefix" name="close-o" />
        <t-icon slot="suffix" name="close-o" />
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div>
      <t-input v-model="input" prefix-icon="share" value="123" suffix-icon="share">
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div>
      <t-input v-model="input" prefix-icon="share" value="123" show-password>
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <br>
    <div class="row demo-input-addon">
      <t-input v-model="input" value="123">
        <template slot="before">http://</template>
      </t-input>
      <br>
      <br>
      <t-input v-model="input" value="123">
        <template slot="after">.com</template>
      </t-input>
      <br>
      <br>
      <t-input v-model="input" value="123">
        <template slot="before">http://</template>
        <template slot="after">.com</template>
      </t-input>
    </div>
    <div class="row demo-input">
      <t-input v-model="input" value="123" />
      <t-input v-model="input4" placeholder="请输入内容" />
      <t-input disabled placeholder="请输入内容" />
      <br>
      <br>
      <t-input v-model="input2" show-password class="show-password-demo" />
      <t-input v-model="input3" clearable />

      <p>{{ 'input：' + input }}</p>
      <p>{{ 'input2：' + input2 }}</p>
      <p>{{ 'input3：' + input3 }}</p>
      <p>{{ 'input4：' + input4 }}</p>
      <div>
        <t-input v-model="input5" type="textarea" placeholder="请输入内容" />
        <p>{{ 'input5：' + input5 }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: ''
    }
  }
}
</script>
