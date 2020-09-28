
this.xxxModel.show(data)
this.xxxModel.hide()


<GlobalModal.Modal wrapClassName='xxx-modal' width={600} bodyStyle={{ padding: 0 }} closable={false} ref={e => this.xxxModel = e}>
 <div>这里是modal的内容</div>
</GlobalModal.Modal>


  GlobalModal.show({
        width: 300,
        title: <div>标题</div>,
        content: <div>
            <div>这里是modal的内容</div>
        </div>
    });