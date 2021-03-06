import { Component, Input, Output, EventEmitter, OnInit, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TreeStore } from './tree-store';
import { TreeNode } from './tree-node';
import { TreeService } from './tree-service';
import { TreeConfig } from './tree-config';
import { TreeMenuItem, NodeMenuItemAction } from './tree-menu';

@Component({
    selector: 'cms-tree',
    template: `
            <div class="tree">
                <div class="tree-item">
                    <tree-node  
                        [node]="root" 
                        [config]="config" 
                        [templates]="templates"
                        (selectNode)="selectNode($event)"
                        (menuItemSelected)="menuItemSelected($event)">
                    </tree-node>
                    <tree-children 
                        [root]="root" 
                        [config]="config" 
                        [templates]="templates">
                    </tree-children>
                </div>
            </div>
                `,
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [TreeStore]
})
export class TreeComponent {

    @ContentChild('treeNodeTemplate') treeNodeTemplate: TemplateRef<any>;
    @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;

    @Input() config: TreeConfig;
    @Input() root: TreeNode;

    @Output() nodeSelected: EventEmitter<any> = new EventEmitter();
    @Output() nodeCreated: EventEmitter<any> = new EventEmitter();
    @Output() nodeInlineCreated: EventEmitter<any> = new EventEmitter();
    @Output() nodeCut: EventEmitter<any> = new EventEmitter();
    @Output() nodeCopied: EventEmitter<any> = new EventEmitter();
    @Output() nodeRenamed: EventEmitter<any> = new EventEmitter();
    @Output() nodePasted: EventEmitter<any> = new EventEmitter();
    @Output() nodeDeleted: EventEmitter<any> = new EventEmitter();

    private subscriptions: Subscription[] = [];
    private templates: any = {
        loadingTemplate: this.loadingTemplate,
        treeNodeTemplate: this.treeNodeTemplate
    };
    constructor(private store: TreeStore) { }

    ngOnInit() {
        if (this.config) {
            this.store.treeService = this.config.service;

            this.subscriptions.push(this.store.nodeSelected$.subscribe(node => {
                this.nodeSelected.emit(node);
            }));

            this.subscriptions.push(this.store.nodeCreated$.subscribe(node => {
                this.nodeCreated.emit(node);
            }));

            this.subscriptions.push(this.store.nodeInlineCreated$.subscribe(node => {
                this.nodeInlineCreated.emit(node);
            }));

            this.subscriptions.push(this.store.nodeCut$.subscribe(node => {
                this.nodeCut.emit(node);
            }));

            this.subscriptions.push(this.store.nodeCopied$.subscribe(node => {
                this.nodeCopied.emit(node);
            }));

            this.subscriptions.push(this.store.nodeRenamed$.subscribe(node => {
                this.nodeRenamed.emit(node);
            }));

            this.subscriptions.push(this.store.nodePasted$.subscribe(node => {
                this.nodePasted.emit(node);
            }));

            this.subscriptions.push(this.store.nodeDeleted$.subscribe(node => {
                this.nodeDeleted.emit(node);
            }));
        }
    }

    //handle event when node is clicked
    selectNode(node: TreeNode) {
        node.isSelected = true;
        this.store.fireNodeSelected(node);
    }

    menuItemSelected(menuEvent) {
        this.store.fireNodeActions(menuEvent);
    }

    reloadNode(nodeId) {
        this.store.reloadNode(nodeId);
    }

    locateToSelectedNode(node: TreeNode) {
        this.store.locateToSelectedNode(node);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub && sub.unsubscribe());
    }
}
