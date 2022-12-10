<template>
  <div>
    <h2>Ellipsis</h2>
    <h3>单行</h3>
    <div>
      <tu-ellipsis style="max-width: 200px;">我们总是珍惜未得到的，而遗忘了所拥有的</tu-ellipsis><br><br>
      <tu-ellipsis style="max-width: 200px;">从来如此，便对吗</tu-ellipsis>
    </div>
    <h3>多行</h3>
    <div>
      <tu-ellipsis line-clamp="2" style="max-width: 200px;">人的一生是短的，但如果卑劣地过这短的一生，就太长了。</tu-ellipsis>
      <br/>
      <tu-ellipsis line-clamp="2" style="max-width: 200px;">你如果认识从前的我，也许会原谅现在的我</tu-ellipsis>
    </div>
    <h3>展开/折叠</h3>
    <!-- <tu-ellipsis style="max-width: 200px;" :tooltip="false">我们总是珍惜未得到的，而遗忘了所拥有的</tu-ellipsis> -->
    <tu-ellipsis
      line-clamp="2"
      expand-trigger="click"
      style="max-width: 200px;"
      :tooltip="false">人的一生是短的，但如果卑劣地过这短的一生，就太长了。</tu-ellipsis>
  </div>
</template>